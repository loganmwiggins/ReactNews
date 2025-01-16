import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import '../stylesheets/ArticleCard.css';

function ArticleCard({imagePath, title, author, dateTime, description, url, source, isFavorited, setFavorites, isHidden, setHidden}) {
    // Card scroll animation
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            x: -200 
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "linear",
            },
        },
    };

    // Modal styles
    const customStyles = {
        overlay: {
            background: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'black',
            color: 'white',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
    };

    Modal.setAppElement('#root');

    const [modalIsOpen, setIsOpen] = useState(false);

    function toggleModal(event) {
        event.stopPropagation();
        setIsOpen(!modalIsOpen);
    }

    // Article actions
    function openArticle(articleUrl) {
        window.open(articleUrl, "_blank");
    }

    function shareArticle(event) {
        event.stopPropagation();

        if (navigator.share) {
            navigator
                .share({
                    title: title,
                    text: `Check out this article: ${title}`,
                    url: url,
                })
                .then(() => console.log("Article shared successfully!"))
                .catch((error) => console.error("Error sharing article:", error));
        } else {
            alert("Sharing is not supported on your browser. Please copy the URL manually.");
        }
    }

    // Add or remove article from favorites
    async function toggleFavorite(event) {
        event.stopPropagation(); // Prevent triggering the `onClick` for opening the article

        try {
            if (isFavorited) {
                // Remove article from favorites
                await fetch("https://localhost:7081/api/Favorites/Remove", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(url),
                });

                setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.url !== url));
            } else {
                // Validate article data
                if (title == null) title = "";
                if (author == null) author = "";
                if (dateTime == null) dateTime = "";
                if (description == null) description = "";
                if (imagePath == null) imagePath = "";
                if (url == null) url = "";
                if (source == null) source = "";

                // Add article to favorites
                const articleData = { title, author, dateTime, description, imagePath, url, source };
                await fetch("https://localhost:7081/api/Favorites/Add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(articleData),
                });

                setFavorites((prevFavorites) => [...prevFavorites, articleData]);
            }
        } catch (error) {
            alert("Error toggling favorite:", error);
            console.error("Error toggling favorite:", error);
        }
    }

    // Add or remove article from hidden
    async function toggleHidden(event) {
        event.stopPropagation(); // Prevent triggering the `onClick` for opening the article

        try {
            if (isHidden) {
                // Remove article from hidden
                await fetch("https://localhost:7081/api/Hidden/Remove", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(url),
                });

                setHidden((prevHidden) => prevHidden.filter((hid) => hid.url !== url));
            } else {
                // Validate article data
                if (title == null) title = "";
                if (author == null) author = "";
                if (dateTime == null) dateTime = "";
                if (description == null) description = "";
                if (imagePath == null) imagePath = "";
                if (url == null) url = "";
                if (source == null) source = "";

                // Add article to hidden
                const articleData = { title, author, dateTime, description, imagePath, url, source };
                await fetch("https://localhost:7081/api/Hidden/Add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(articleData),
                });

                setHidden((prevHidden) => [...prevHidden, articleData]);
            }
        } catch (error) {
            alert("Error toggling hidden:", error);
            console.error("Error toggling hidden:", error);
        }
    }


    
    return (
    <>
        {/* Modal */}
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
            portalClassName="modal"
        >
            <div className="btn-ctnr">
                <button type="button" className="btn-icon" onClick={toggleModal}>
                    <img src="/assets/close.svg" draggable="false" />
                </button>
            </div>
            <img className="news-image" src={imagePath} alt="Article image" draggable="false" />
            <h2>{title}</h2>
            <p className="news-description">{description}</p>
        </Modal>

        {/* Article card */}
        <motion.div
            className="news-item"
            onClick={() => openArticle(url)}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
        >
            <div className="news-item-content">
                <img className="news-image" src={imagePath} alt="Article image" draggable="false" />

                <div className="news-text">
                    <div className="news-meta">
                        { author ? (<span className="news-author">{author} • </span>) : (<span></span>) }
                        <span className="news-date">{new Date(dateTime).toLocaleDateString()}</span>
                    </div>

                    <div className="news-title">{title}</div>
                    <p className="news-description">{description}</p>
                </div>
            </div>
            <div className="news-item-btns">
                {/* <button 
                    type="button" 
                    className="btn-icon" 
                    onClick={toggleModal}
                    title="Open article modal"
                >
                    <img 
                        src="/assets/expand.svg" 
                        draggable="false" 
                    />
                </button> */}
                <button 
                    type="button" 
                    className="btn-icon" 
                    style={isFavorited ? {display: "none"} : {}}
                    onClick={toggleHidden}
                    title="Hide this article"
                >
                    <img 
                        src={isHidden ? "/assets/hidden-filled.svg" : "/assets/hidden.svg"} 
                        draggable="false" 
                    />
                </button>
                <button 
                    type="button" 
                    className="btn-icon"
                    style={isHidden ? {display: "none"} : {}}
                    onClick={toggleFavorite}
                    title="Favorite this article"
                >
                    <img
                        src={isFavorited ? "/assets/heart-filled.svg" : "/assets/heart.svg"}
                        style={isFavorited ? {filter: "none"} : {}}
                        draggable="false"
                    />
                </button>
                <button 
                    type="button" 
                    className="btn-icon"
                    onClick={shareArticle}
                    title="Share this article"
                >
                    <img src="/assets/share.svg" draggable="false" />
                </button>
            </div>
        </motion.div>
    </>
    );
}

export default ArticleCard;