
const customfavIcon = "https://res.cloudinary.com/dphleqb5t/image/upload/v1713724442/jc-develop/favicon-c_qlvrpv.png";      //adding our favicon to swagger

// const customCss = `
//     .topbar{
//         animation: navanimation linear both;
//         animation-range: 0 300px;
//         animation-timeline: scroll(root);
//         position: sticky;
//         top: 0px;
//         z-index: 1
//     }
//     .topbar-wrapper {
//         content: Prueba; color: white;
//     }  
//     .topbar-wrapper a {
//         content:url(https://res.cloudinary.com/dphleqb5t/image/upload/v1713730346/rest-api-template/Logo-Swagger_ukcytn.png); width:200px; height:auto;
//     }
//     .swagger-ui .opblock .opblock-summary-description { 
//         font-weight: 900 
//     }
//     .description .renderedMarkdown p {
//         font-size: 1rem;
//     }
//     @keyframes navanimation {
//         to {
//             opacity: 0.9;
//             backdrop-filter: blur(10px);
//         }
//     }
// `

const customSiteTitle = "Convoka App REST API Documentation";   //add site title to swagger for nice SEO

const customJs = "script url";                  //uncomment this line to add a custom script file
const customJsStr = "alert('prueba')";          //uncomment this line to add a custom script


const swaggerOptions = {
    customfavIcon,
    // customCss,
    customSiteTitle,
    // customJs,   //uncomment this line to add a custom script file
    // customJsStr,  //uncomment this line to add a custom script
    swaggerOptions: {
        persistAuthorization: true, // this helps to retain the token even after refreshing the (swagger UI web page)
        // defaultModelsExpandDepth: -1 //uncomment this line to stop seeing the schema on swagger ui

    },
}

const swaggerTitle = "Convoka App REST API Documentation"

const swaggerDescription = `
Convoka es una plataforma diseñada para iglesias y ministerios cristianos que desean organizar, gestionar y registrar eventos de forma eficiente.

Esta API permite:
- Crear y administrar **organizaciones** (iglesias o ministerios)
- Registrar y controlar **usuarios** con distintos roles y permisos
- Gestionar **eventos** con asistentes, costos, pagos y roles personalizados
- Facilitar el **check-in**, el registro por QR y la recopilación de datos en tiempo real
- Soportar relaciones familiares entre asistentes (como matrimonios o tutores)
- Brindar una experiencia multiusuario y multiubicación según el plan contratado

Esta API está protegida con autenticación basada en JWT, y su uso requiere tener un token válido para acceder a la mayoría de los endpoints.

Todos los planes incluyen funcionalidades básicas y escalables. Convoka es una herramienta pensada para servir al Reino, facilitando la organización y convocación de personas para propósitos con impacto eterno.
`

export {
    swaggerOptions,
    swaggerTitle,
    swaggerDescription
}