const data = require('./data.json');

function get(id) {
    return data.find(animal => animal.id == id)
}

function deleteA(id) {
    let deletedAnimal;
    data.forEach(function (animal, index) {
        if (animal.id == id) {
            deletedAnimal = data.splice(index, index + 1);
        }
    })
    return deletedAnimal
}

function add(animalname, sexname) {
    data.push({ id: data.length + 1, animalname, sexname })

}

function update(id, speciesname, puttosleep) {
    get(id).speciesname = speciesname
    get(id).puttosleep = puttosleep
}

module.exports = {
    get: get,
    add: add,
    update: update,
    delete: deleteA,
    data: data,
}
