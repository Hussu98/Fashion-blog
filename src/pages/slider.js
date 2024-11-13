import * as React from 'react'
import sneaker from './images/sneakerBg.png'
import menFashion from './images/menFashionBg.png'
import womanInRed from './images/womanInRedBg.png'

function Slider(){
    const [currentSlide, setCurrentSlide] = React.useState(0)

    const slides = [
        {
            id: 1, 
            headContent: 'Welcome to BKJ Fashion Blog', 
            subCnt: "Get your latest fashion ideas today", 
            bg:'bg-gradient-to-r from-purple-500 to-purple-100', 
            image: sneaker
        },
        {
            id: 2, 
            headContent: 'Checkout the latest', 
            subCnt: "Fashion design ideas", 
            bg:'bg-gradient-to-r from-purple-500 to-purple-100', 
            image: menFashion,
            button: (
                <button className="mt-4 px-4 py-2 bg-gray-500 shadow-2xl shadow-black text-white font-bold text-4xl rounded-lg hover:bg-gray-600">
                    Read Posts
                </button>
            )
        },
        {
            id: 3, 
            headContent: 'Contact us for more', 
            subCnt: "Fashion design ideas", 
            bg:'bg-gradient-to-r from-purple-500 to-purple-100', 
            image: womanInRed,
            button: (
                <button className="mt-4 px-4 py-2 bg-gray-500 shadow-2xl shadow-black text-white font-bold text-4xl rounded-lg hover:bg-gray-600">
                    Contact Us
                </button>
            )
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => prev === slides.length -1 ? 0 : prev + 1)
    }

    React.useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide()
        }, 3000)

        return () => clearInterval(slideInterval)
    }, [])
    return (
        <div className="relative w-full max-w-full mx-auto overflow-hidden">
            <div className="flex transition-transform duration-500" style={{transform: `translate(-${currentSlide * 100}%)`}}>
                {slides.map((slide) => (
                    <div 
                        key={slide.id} 
                        className={`w-full flex-shrink-0 h-[500px] ${slide.bg} text-white flex items-center justify-center`}
                    >
                        <div className="flex-col">
                            <h1 className="text-[50px] p-2 font-bold text-gray-700 tracking-tight leading-tight">{slide.headContent}</h1>
                            <p className="text-gray-700 font-bold p-2 text-[30px]">{slide.subCnt}</p>
                            <button className='ml-2'>{slide.button}</button>
                        </div>
                        <img src={slide.image} alt="Slide Image" className="mt-4 w-[60%] mx-auto shadow-2xl shadow-black transform rounded-md hover:scale-105 transition-all duration-500 ease-in-out" />
                    </div>                
                ))}
            </div>
        </div>
    )
};

export default Slider;