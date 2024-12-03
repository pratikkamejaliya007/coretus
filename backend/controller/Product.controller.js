import Product from "../model/Product.model.js";


export const createProduct = async (req, res) => {
  try {
    req.body.image = req.file.path
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    const baseURL = `${req.protocol}://${req.get('host')}`;
    const updatedProducts = products.map(product => ({
      ...product._doc,
      image: product.image.startsWith('http') ? product.image : `${baseURL}/${product.image}`,
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};



export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const baseURL = `${req.protocol}://${req.get('host')}`;

    const updatedProduct = {
      ...product._doc,
      image: product.image.startsWith('http') ? product.image : `${baseURL}/${product.image}`,
    };

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
