const { sale, salesProduct } = require('../database/models');
const { errorsTypes } = require('../utils/errorsCatalog');

const findAll = async () => {
  const allSales = await sale.findAll();
  return allSales;
};

const findById = async (id) => {
  const result = await sale.findByPk(id);
  return result;
};

const upDateStatus = async (id, statusSales) => {
  const { status } = statusSales;
  if (!status) throw new Error(errorsTypes.PROPERTY_INVALID);
  await sale.update(statusSales, { where: { id } });
  const result = await findById(id);
  return result;
};

const deleteSale = async (id) => {
  await sale.destroy({ where: { id } });
  return { message: 'Sale deleted successfully' };
};

const createSale = async (saleData) => {
    const { products, ...saleInfo } = saleData;
    const saleDate = new Date();
    const status = 'Pendente';

    const addNewSale = await sale.create({
      ...saleInfo,
      saleDate,
      status,
    });

    console.log(addNewSale);

    const insertSalesProducts = products.map(async ({ id, quantity }) => {
      await salesProduct.create({ saleId: addNewSale.id, productId: id, quantity });
    });
    await Promise.all(insertSalesProducts);
    return addNewSale;
};

module.exports = {
  findAll,
  findById,
  upDateStatus,
  deleteSale,
  createSale,
};
