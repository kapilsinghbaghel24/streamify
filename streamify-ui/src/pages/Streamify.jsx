import { useEffect, useState } from "react";
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import backgroundImage from '../assets/home.jpg';
import MovieLogo from '../assets/homeTitle.png';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres, clearData } from "../store";
import Slider from "../components/Slider";

const Streamify = () => {
    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);

    const genresLoaded = useSelector((state) => state.streamify.genresLoaded);
    const movies = useSelector((state) => state.streamify.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());

        return () => dispatch(clearData());
    }, [dispatch]);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "all" }));

        return () => dispatch(clearData());
    }, [dispatch, genresLoaded])

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);

        return () => (window.onscroll = null);
    }

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                <img src={backgroundImage} alt="background" className="background-image" />
                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="Movie Logo" />
                    </div>
                    <div className="buttons flex">
                        <button className="flex j-center a-center" onClick={() => navigate("/player")}>
                            <FaPlay /> Play
                        </button>
                        <button className="flex j-center a-center">
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </Container>
    );
}

const Container = styled.div`
background-color: black;
.hero{
    position: relative;
    .background-image{
        filter: brightness(60%);
    }
    img{
        height: 100vh;
        width: 100vw;
    }
    .container{
        position: absolute;
        bottom: 5rem;
        .logo{
            img{
                width: 60%;
                height: 100%;
                margin-left: 5rem;
            }
        }
        .buttons{
            margin: 5rem;
            gap: 2rem;
            button{
                font-size: 1.4rem;
                gap: 1rem;
                border-radius: 0.2rem;
                padding: 0.5rem;
                padding-left: 2rem;
                padding-right: 2.4rem;
                border: none;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover{
                    opacity: 0.8;
                }
                &:nth-of-type(2){
                    background-color: rgba(109, 109, 110, 0.7);
                    color: white;
                    svg{
                        font-size: 1.8rem;
                    }
                }
            }
        }
    }
}
`;

export default Streamify;