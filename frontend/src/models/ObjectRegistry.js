class ObjectRegistry {
  structure = null;

  traverse(cb, structure) {
    if(!structure) {
      structure = this.structure;
    }
    const shouldEnd = cb(structure);
    if(shouldEnd) {
      return true;
    }
    for(const i in structure.childs) {
      this.traverse(cb, structure.childs[i]);
    }
    return false;
  }

  findItem(object, structure) {
    if(structure.object === object) {
      return structure;
    }
    if(structure.childs.length) {
      for(const j in structure.childs) {
        const foundInChilds = this.findItem(object, structure.childs[j]);
        if(foundInChilds) {
          return foundInChilds;
        }
      }
    }
    return false;
  }

  setRoot(object) {
    this.structure = {object, childs: []};
  }

  getRoot() {
    return this.structure;
  }

  add(object, parent) {
    if(!this.structure) {
      throw new Error('Structure not yet created');
    }
    const foundParent = this.findItem(parent, this.structure);
    if(!foundParent) {
      throw new Error('Parent object not found in registry');
    }
    foundParent.childs.push({object, childs: []});
  }

  reset() {
    this.structure = null;
  }
}

const objectRegistry = new ObjectRegistry();

export default objectRegistry;
