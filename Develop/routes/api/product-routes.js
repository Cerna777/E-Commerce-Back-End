const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all the products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Tag, as: 'tags', through: ProductTag, attributes: ['id', 'tag_name'] }
      ],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get one of the product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Tag, as: 'tags', through: ProductTag, attributes: ['id', 'tag_name'] }
      ],
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// creates new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// updates product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    if (product[0] === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// deletes one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (product === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
