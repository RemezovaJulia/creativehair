const smartGrid = require('./index');

/* It's principal settings in smart grid project */
let settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '20px', /* gutter width px || % || rem */
    mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        xlg: {
            width: '1400px',
        },
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        xmd: {
            width: '1024px'
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
    }
};

smartGrid('../src/public/css', settings);