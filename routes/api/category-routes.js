const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET all categories
router.get('/', (req, res) => {
  console.log("get route testing");
  Category.findAll({ 
    include: [Product], // commented out until its associated Products
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));

});

//GET single category by 'id' value
router.get('/:id', (req, res) => {
  try {
    const categoryData = Category.findByPk(req.params.id, {
    include: [Product]  //include its associated Products
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//CREATE category
router.post('/', (req, res) => {
  try {
    const categoryData = Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE a category by its `id` value
router.put('/:id', (req, res) => {
  try {
    const categoryData = Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category associated with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const categoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
