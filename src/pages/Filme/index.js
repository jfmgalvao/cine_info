import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import './filme.css';

function Filme() {
   const { id } = useParams();
   const [filme, setFilme] = useState({});
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      async function loadFilme() {
         await api
            .get(`/movie/${id}`, {
               params: {
                  api_key: 'ac4d2bdca1869bbe0db21861340c3623',
                  language: 'pt-BR',
               },
            })
            .then((response) => {
               console.log(response.data);
               setFilme(response.data);
               setLoading(false);
            })
            .catch(() => {
               navigate('/', { replace: true });
               return;
            });
      }

      loadFilme();

      return () => {};
   }, [id, navigate]);

   function salvarFilme() {
      const minhaLista = localStorage.getItem('@cineInfo');
      let filmesSalvos = JSON.parse(minhaLista) || [];
      const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

      if (hasFilme) {
         toast.warn('Esse filme já consta na lista');
         return;
      }

      filmesSalvos.push(filme);
      localStorage.setItem('@cineInfo', JSON.stringify(filmesSalvos));
      toast.success('Filme salvo com sucesso!');
   }

   if (loading) {
      return (
         <div className="filme-info">
            <h2>Carregando detalhes do filme ...</h2>
         </div>
      );
   }

   return (
      <div className="filme-info">
         <h1>{filme.title}</h1>
         <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
         <h3>Sinopse</h3>
         <span>{filme.overview}</span>
         <strong>Avaliação: {filme.vote_average}/10</strong>
         <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
               <a
                  target="blank"
                  rel="external noreferrer"
                  href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}
               >
                  Trailer
               </a>
            </button>
         </div>
      </div>
   );
}

export default Filme;
