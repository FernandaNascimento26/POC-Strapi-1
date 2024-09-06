import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar as FAQs da API do Strapi
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/faqs');
        setFaqs(response.data.data); // Armazena as FAQs no estado
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar FAQs:', error);
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>FAQ - Perguntas Frequentes</h1>
      {faqs.length > 0 ? (
        <ul>
          {faqs.map((faq) => (
            <li key={faq.id}>
              <h3>{faq.attributes.Pergunta}</h3>
              <p>{faq.attributes.Resposta}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma FAQ disponível no momento.</p>
      )}
    </div>
  );
}

export default FAQPage;
