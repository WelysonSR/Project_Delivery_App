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

module.exports = {
  findAll,
  findById,
  upDateStatus,
};