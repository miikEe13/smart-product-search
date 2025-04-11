export function buildPrompt(query, products) {
    const productList = products.map((p) => `- "${p.title}": ${p.description}`).join('\n');
  
    return `
  Eres un asistente de compras inteligente que entiende consultas en inglés y español.
  
  Tu tarea es recomendar exactamente 5, está prohibido devolver más, productos REALES y EXISTENTES de la lista proporcionada. 
  NO debes inventar productos ni modificar los títulos. 
  Debes seleccionar solo de los productos listados a continuación que hagan sentido con la busqueda del usuario.
  
  Consulta del usuario / User query:
  "${query}"
  
  Lista de productos disponibles:
  ${productList}
  
  Devuelve un JSON EXACTAMENTE con este formato:
  
  [
    {
      "title": "El título del producto (debe coincidir exactamente con la lista)",
      "reason": "Explicación breve (en español) de por qué este producto es relevante"
    }
  ]
  
  Reglas importantes:
  - NO inventes productos.
  - NO agregues productos que no están en la lista.
  - Usa los títulos exactamente como están escritos.
  - Si no hay coincidencias relevantes, devuelve un array vacío: []
  - Tu respuesta debe ser SOLO el JSON. Nada más.
  Responde ahora.
  `;
  }
  