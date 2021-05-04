const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all product tags
router.get('/', async (req, res) => {
  try {
    const tagData = await ProductTag.findAll({ // find all tags
      include: [{model: Product}], // include associated Product data
    }); 
    res.status(200).json(tagData);
  } catch (err) { f
    res.status(500).json(err);
  }
});

// GET tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await ProductTag.findByPk(req.params.id, { // find a single tag by its `id`
      include: [{model: Product}], // include associated Product data
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags associated with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE tag
router.post('/', async (req, res) => {
  try {
    const tagData = await ProductTag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE tag by id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await ProductTag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag associated with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await ProductTag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
