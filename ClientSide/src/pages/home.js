import * as React from 'react'
import Slider from './slider.js'
import Card from './CardComponent.js'

function Home(){

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 bg-gray-200 p-6">
                <Slider />
                <Card />
            </div>
            <div className="w-64 bg-purple-600 text-white p-6">
                <h1 className="text-2xl font-bold mb-4">Sidebar</h1>
            </div>
        </div>
    )
};

export default Home;