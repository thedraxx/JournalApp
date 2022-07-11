
// Esto se encarga de subir las imagenes a cloudinary
// Es una peticion HTTP 
export const fileUpload = async (file) => {

    // Si no hay un archivo lanzamos un error
    if (!file) throw new Error('No hay archivo para subir');

    // Creamos una referencia a la colección de cloudinary
    const cloudURL = 'https://api.cloudinary.com/v1_1/thedraxx/upload';
    const formData = new FormData();
    // Agregamos el archivo a el form
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    // usamos try catch para capturar los errores
    try {

        // Usamos fetch para hacer la peticion HTTP
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData,
        });

        console.log(resp)
        // Si la respuesta no es 200 lanzamos un error
        if (!resp.ok) throw new Error('no se pudo subir imagen')

        // Si todo sale bien, obtenemos el json de la respuesta
        const cloudResp = await resp.json();
        console.log(cloudResp);

        // Si todo sale bien, retornamos el url de la imagen
        return cloudResp.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}
