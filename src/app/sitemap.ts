import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANTE: Substitua pela URL real do seu site
  const baseUrl = "https://www.ju-decoracao-de-natal.com.br";

  // Lista das suas páginas estáticas
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Futuramente, se tiver páginas dinâmicas (ex: uma página para cada produto),
  // você pode buscar os dados do Supabase aqui e adicionar as URLs dinâmicas.
  // Exemplo:
  // const produtos = await supabase.from('Produtos').select('id');
  // const productRoutes = produtos.map(produto => ({
  //   url: `${baseUrl}/produto/${produto.id}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 0.5,
  // }));

  return [
    ...staticRoutes,
    // ...productRoutes, // Descomente quando tiver as rotas dinâmicas
  ];
}
