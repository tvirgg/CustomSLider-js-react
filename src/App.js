import React from 'react';
import Slider from './components/Slider';

const App = () => {
  const slides = [
    { category: 'ЖК Патриция', name: 'Проект 1', year: 2023, image: 'https://img.freepik.com/free-photo/beautiful-scenery-canyon-landscape-grand-canyon-national-park-arizona-usa_181624-42018.jpg', price: '200 000 ₽' },
    { category: 'Каньон США', name: 'Проект 2', year: 2024, image: 'https://img.freepik.com/premium-photo/scenic-canyon-sweden-ar-32_1149116-482.jpg', price: '300 000 ₽' },
    { category: 'Каньон Швеция', name: 'Проект 3', year: 2024, image: 'https://img.freepik.com/premium-photo/canyon-river-beautiful-landscape-ai-generated_406939-8932.jpg', price: '400 000 ₽' },
    { category: 'Каньон Река', name: 'Проект 4', year: 2024, image: 'https://buro314.ru/wp-content/uploads/2024/03/02_%D0%BF%D1%83%D1%82240325-%D1%81%D1%88%D0%B02.jpg', price: '500 000 ₽' },
    { category: 'ЖК Патриция', name: 'Проект 1', year: 2023, image: 'https://img.freepik.com/free-photo/beautiful-scenery-canyon-landscape-grand-canyon-national-park-arizona-usa_181624-42018.jpg', price: '200 000 ₽' },
    { category: 'Каньон США', name: 'Проект 2', year: 2024, image: 'https://img.freepik.com/premium-photo/scenic-canyon-sweden-ar-32_1149116-482.jpg', price: '300 000 ₽' },
    { category: 'Каньон Швеция', name: 'Проект 3', year: 2024, image: 'https://img.freepik.com/premium-photo/canyon-river-beautiful-landscape-ai-generated_406939-8932.jpg', price: '400 000 ₽' },
    { category: 'Каньон Река', name: 'Проект 4', year: 2024, image: 'https://buro314.ru/wp-content/uploads/2024/03/02_%D0%BF%D1%83%D1%82240325-%D1%81%D1%88%D0%B02.jpg', price: '500 000 ₽' },
    { category: 'ЖК Патриция', name: 'Проект 1', year: 2023, image: 'https://img.freepik.com/free-photo/beautiful-scenery-canyon-landscape-grand-canyon-national-park-arizona-usa_181624-42018.jpg', price: '200 000 ₽' },
    { category: 'Каньон США', name: 'Проект 2', year: 2024, image: 'https://img.freepik.com/premium-photo/scenic-canyon-sweden-ar-32_1149116-482.jpg', price: '300 000 ₽' },
  ];

  return (
    <div className="App">
      <Slider slides={slides} />
    </div>
  );
};

export default App;
