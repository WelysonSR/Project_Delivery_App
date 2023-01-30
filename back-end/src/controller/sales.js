const salesService = require('../service/sales');
const statusHttp = require('../utils/statusHttp');

const findAll = async (_req, res) => {
  const allSales = await salesService.findAll();
  res.status(statusHttp.OK).json(allSales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  res.status(statusHttp.OK).json(result);
};

const upDateStatus = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.upDateStatus(id, req.body);
  res.status(statusHttp.OK).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  await salesService.deleteSale(id);
  res.status(statusHttp.OK).json({ message: "Sale deleted successfully" });
};

const createSale = async (req, res) => {
  const { id } = req.user;
  const { body } = req;
  const newSale = await salesService.createSale(id, body);
  res.status(statusHttp.CREATED).json(newSale);
};


module.exports = {
  findAll,
  findById,
  upDateStatus,
  deleteSale,
  createSale
};