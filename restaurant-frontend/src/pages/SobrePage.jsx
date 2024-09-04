import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SobrePage() {
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/about');
        setAboutContent(response.data.data);
        console.log('Conteúdo retornado:', response.data.data); // Log do conteúdo
      } catch (error) {
        console.error('Erro ao buscar conteúdo sobre:', error);
      }
    };

    fetchAboutContent();
  }, []);

  if (!aboutContent) {
    return <p>Carregando...</p>;
  }

  const { Title, Missao, Visao, Valores, Endereco, Video } = aboutContent.attributes;

  // Aqui acessamos o conteúdo do iframe dentro da estrutura de objeto.
  const videoIframe = Video && Video[0] && Video[0].children[0].text;

  return (
    <div>
      <h1>{Title || 'Sobre Nós'}</h1>

      <h2>Missão</h2>
      <p>{Missao}</p>

      <h2>Visão</h2>
      <p>{Visao}</p>

      <h2>Valores</h2>
      <p>{Valores}</p>

      <h2>Endereço</h2>
      <p>{Endereco}</p>

      <h2>Vídeo Institucional</h2>
      {/* Renderiza o iframe se ele existir */}
      {videoIframe && (
        <div dangerouslySetInnerHTML={{ __html: videoIframe }} />
      )}
    </div>
  );
}

export default SobrePage;
