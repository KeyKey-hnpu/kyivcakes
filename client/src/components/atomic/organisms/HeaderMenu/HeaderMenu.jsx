import { MenuButton } from "../../atoms/header/MenuButton/MenuButton";
import { useEffect, useState } from "react";
import './HeaderMenu.css';

export const HeaderMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        const fetchCategoriesFromProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const products = await response.json();

                const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchCategoriesFromProducts();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const renderCategory = (data) => {
        return data.map((category, idx) => (
            <div
                className={`category-list-el ${activeCategory === category ? 'active' : ''}`}
                key={idx}
            >
                <MenuButton title={category} src={`#${category}`} onClick={() => {
                    setIsOpen(false);
                    setActiveCategory(category);
                }} />
            </div>
        ));
    };

    return (
        <div className="header-menu">
            <div className="burger-icon" onClick={toggleMenu}>
                ☰
            </div>
            <div className={`category-list ${isOpen ? 'open' : ''}`}>
                <div className="category-list-elemenst">{renderCategory(categories)}</div>
            </div>
        </div>
    );
};
