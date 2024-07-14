import { useRef, useState } from "react"; 
// Uncontrolled component
//Simpler than controlled component. Imporve performance.



const ProductForm = () => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        if (!name) errors.name = "product name is required";
        if (!price || price <= 0) errors.price = "price must be a positive number";
        return errors;
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        console.log('Submitted Product: ', { name, price});
        // handle the form submission
        // sending data to an API or updating state in a parent component
        }
        else{
            setErrors(errors);
        }
    
    };

    return(
        <form onSubmit={handleSubmit}>
            <h3>Add/Edit Product</h3>
            <label>
                Name:
                <input type="text" ref={nameRef}/>
                {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
            </label>
            <br />
            <label>
                Price:
                <input type="number" ref={priceRef}/>
                {errors.price && <div style={{color: 'red'}}>{errors.price}</div>}
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );


};
export default ProductForm;