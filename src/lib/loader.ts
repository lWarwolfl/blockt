import logo from '@public/logo.png';

export const loader = `
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    display: block;
    overflow-y: hidden;
    overflow-x: hidden;
}

@media (prefers-color-scheme: dark) {
    #globalLoader {
        background-color: hsl(240 10% 3.9%);
    }

    #globalLoader.loaded {
        background-color: hsla(240, 10%, 3.9%, 0.4);
    }
}

@media (prefers-color-scheme: light) {
    #globalLoader {
        background-color: hsl(0 0% 100%);
    }

    #globalLoader.loaded {
        background-color: hsla(0, 0%, 100%, 0.4);
    }
}

html.dark #globalLoader {
    background-color: hsl(240 10% 3.9%);
}

html.dark #globalLoader.loaded {
    background-color: hsla(240, 10%, 3.9%, 0.4);
}

html.light #globalLoader {
    background-color: hsl(0 0% 100%);
}

html.light #globalLoader.loaded {
    background-color: hsla(0, 0%, 100%, 0.4);
}

#globalLoader {
    position: fixed;
    z-index: 20;
    display: flex;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    transition: 300ms;
    backdrop-filter: blur(5px);
}

.loader {
    animation: spin 1s ease-in-out infinite;
    width: 56px;
    height: 56px;
    position: relative;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(${logo.src});
    transform-style: preserve-3d;
}

@keyframes spin {
    0% {
        transform: rotateY(0deg);
    }
    100% {
        transform: rotateY(360deg);
    }
}
`;
