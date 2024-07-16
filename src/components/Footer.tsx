import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                {/* BLOQUE PRINCIPAL DE CONTENIDO DEL PIE DE PÁGINA */}
                <div className="flex flex-wrap justify-between">
                    {/* COLUMNA CON LOGOTIPO Y TEXTO DEL PIE DE PÁGINA */}
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
                        <div className="flex items-center mb-4">
                            <img src="./UTMA.png" className="w-10 h-10" alt="UTMA Logo" /> {/* logo image */}
                            <div className="ml-4 text-white">
                                <div className="text-xl font-bold"> UNIVERSIDAD TECNOLOGICA METROPOLITNA DE AGUASCALIENTES</div>
                            </div>
                        </div>
                    </div>
                    {/* COLUMNA CON INFORMACIÓN DE CONTACTO */}
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
                        <p className="mb-2">
                            <i className="fas fa-phone mr-2"></i>
                            <span className="font-semibold">Dirección:</span>
                            <p>Av. Gerónimo de la Cueva s/n, Villas del Río, 20126 Aguascalientes, Ags.</p> {/* address */}
                        </p>
                        <p>
                            <i className="fas fa-print mr-2"></i>
                            <span className="font-semibold">Teléfono:</span>
                            <p>449 925 3920</p> {/* phone number */}
                        </p>
                    </div>
                </div>
                <hr className="my-6 border-gray-700" />
                {/* BLOQUE CON REDES SOCIALES Y COPYRIGHT */}
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-auto mb-4 md:mb-0">
                        <span className="text-sm">&copy; 2024 Company, Inc</span> {/* copyright */}
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="https://utma.edu.mx" target="blank">
                                <img className="w-6 h-6" src="images/utmaLogotype.png" alt="UTMA" /> {/* UTMA logo link */}
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/UTMABiS/?locale=es_LA" target="blank">
                                <img className="w-6 h-6" src="images/facebook.png" alt="Facebook" /> {/* Facebook link */}
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/@utmetropolitana" target="blank">
                                <img className="w-6 h-6" src="images/tik.png" alt="TikTok" /> {/* TikTok link */}
                            </a>
                        </li>
                        <li>
                            <a href="#!" target="blank">
                                <img className="w-6 h-6" src="images/whatsapp.png" alt="WhatsApp" /> {/* WhatsApp link */}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
