import { useState, useEffect } from "react";

export default function Test (){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        stock: "",
        price: "",
        image: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleImage = (e) => {
        const file = e.target.file;
        if(file){
            setFormData({...formData, image: file[0]})
        }
    }


}