// src/app/api/quote-request/route.ts

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// --- Esquemas de Validação com Zod ---
const requestItemSchema = z.object({
  product_type: z.string().min(1, "Tipo do produto é obrigatório"),
  product_details: z.string().min(1, "Detalhes do produto são obrigatórios"),
});

const quoteRequestSchema = z.object({
  client_name: z.string().min(2, "Nome do cliente é obrigatório"),
  client_email: z.string().email("Formato de e-mail inválido"),
  items: z.array(requestItemSchema).min(1, "Selecione ao menos um item"),
});

// --- Função Auxiliar para Mensagem do WhatsApp ---
function formatWhatsAppMessage(
  clientName: string,
  items: z.infer<typeof requestItemSchema>[]
) {
  let message = `Olá! 👋 Tenho um novo pedido de orçamento:\n\n`;
  message += `*Cliente:* ${clientName}\n\n`;
  message += `*Itens Selecionados:*\n`;

  items.forEach((item) => {
    message += `  - *${item.product_type}:* ${item.product_details}\n`;
  });

  message += `\nPor favor, entre em contato para prosseguir com a venda.`;
  return message;
}

// --- Handler da Rota POST ---
export async function POST(request: NextRequest) {
  // 1. Receber e Validar os dados do corpo da requisição
  const body = await request.json();
  const validation = quoteRequestSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Dados inválidos", details: validation.error.issues },
      { status: 400 }
    );
  }

  const { client_name, client_email, items } = validation.data;

  try {
    // 2. Conectar ao Supabase com a chave de administrador (segura no backend)
    // Usamos as '!' para afirmar ao TypeScript que essas variáveis de ambiente existem.
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Salvar no Banco de Dados
    // Primeiro, insere o pedido principal e retorna o ID
    const { data: quoteRequest, error: quoteError } = await supabaseAdmin
      .from("QuoteRequests")
      .insert({ client_name, client_email, status: "pending" })
      .select("id")
      .single();

    if (quoteError) throw quoteError;

    // Depois, associa os itens ao ID do pedido recém-criado
    const requestItemsData = items.map((item) => ({
      request_id: quoteRequest.id,
      product_type: item.product_type,
      product_details: item.product_details,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("RequestItems")
      .insert(requestItemsData);

    if (itemsError) throw itemsError;

    // 4. Gerar o link do WhatsApp
    const message = formatWhatsAppMessage(client_name, items);
    // IMPORTANTE: Substitua 55SEUNUMERO pelo seu número de WhatsApp com código do país.
    const whatsappUrl = `https://wa.me/5515996690551?text=${encodeURIComponent(
      message
    )}`;

    // 5. Retornar a resposta de sucesso
    return NextResponse.json({ success: true, whatsappUrl }, { status: 201 });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
