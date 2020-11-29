require("pretty-error").start();
const Person = require("../model/Person");
const asyncHandler = require("express-async-handler");
const log = log4js.getLogger("Person");
log.level = "info";

// * Get All Person
exports.getPerson = asyncHandler(async (req, res, next) => {
  const person = await Person.find({});
  if (person.length == 0) {
    return res.status(200).json({ success: false, message: "No Person Data" });
  }
  res.status(200).json({ success: true, total: person.length, data: person });
});

// * Create Person
exports.createPerson = asyncHandler(async (req, res, next) => {
  const { name, job, address } = req.body;
  const person = await Person.create(req.body);
  res.status(201).json({ success: true, data: person });
});

// * Update Person
exports.updatePerson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const person = await Person.findByIdAndUpdate(id, req.body);
  res.status(200).json({ success: true, data: person });
});

// * Delete Person
exports.deletePerson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Person.findOneAndDelete(id);
  res.status(200).json({ succes: true });
});
