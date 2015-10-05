import Handlebars from 'handlebars';

function instantiate(load) {
    console.log('compiling template:', load.name);
    return Handlebars.compile(load.source);
}

export { instantiate };