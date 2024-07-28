import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Footer() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.innerHeight + window.scrollY;
            if (scrollPosition >= scrollHeight - 1) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`bg-gray-800 text-gray-300 py-8 w-full transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-100'}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
                        <div className="flex items-center mb-4">
<<<<<<< Updated upstream
                            <img src="./UTMA.png" className="w-10 h-10" alt="UTMA Logo" /> {/* logo image */}
=======
                            <img src="./UTMA.png" className="w-10 h-10" alt="UTMA Logo" />
>>>>>>> Stashed changes
                            <div className="ml-4 text-white">
                                <div className="text-xl font-bold"> UNIVERSIDAD TECNOLOGICA METROPOLITANA DE AGUASCALIENTES</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
                        <div className="mb-2">
                            <i className="fas fa-phone mr-2"></i>
                            <span className="font-semibold">Dirección:</span>
                            <div>Av. Gerónimo de la Cueva s/n, Villas del Río, 20126 Aguascalientes, Ags.</div>
                        </div>
                        <div>
                            <i className="fas fa-print mr-2"></i>
                            <span className="font-semibold">Teléfono:</span>
                            <div>449 925 3920</div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-700" />
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-auto mb-4 md:mb-0">
                        <span className="text-sm">&copy; 2024 Company, Inc</span>
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="https://utma.edu.mx" target="blank">
                                <img className="w-7.5 h-8" src="UTMA.png" alt="UTMA" />
                            </Link>
                        </li>
                        <li>
                            <Link to="https://www.facebook.com/UTMABiS/?locale=es_LA" target="blank">
                                <img className="w-7 h-7.5" src="facebook.svg" alt="Facebook" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" target="blank">
                                <img className="w-6.5 h-7" src="whatsapp.svg" alt="WhatsApp" />
                            </Link>
                        </li>
                        <li>
                            <Link to="https://www.tiktok.com/@utmetropolitana" target="blank">
                                <img className="w-7 h-7" src="tiktok.svg" alt="TikTok" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;