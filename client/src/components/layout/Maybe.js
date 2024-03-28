

const Maybe = ({ children, fallback= null, condition  }) => {

    if (!condition) return fallback;

    return children

    
}



export default Maybe