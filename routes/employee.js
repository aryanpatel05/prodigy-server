const express = require('express');
const { createEmployee, getAllEmployees, deleteEmployee, updateEmployee } = require('../controllers/employeeController');
const router = express.Router();

// @route   POST api/employees
// @desc    Create a new employee
// @access  Public (Change to Private if needed)
router.post('/', createEmployee);

// @route   GET api/employees
// @desc    Get all employees
// @access  Public (Change to Private if needed)
router.get('/', getAllEmployees);

// @route   DELETE api/employees/:id
// @desc    Delete an employee by ID
// @access  Public (Change to Private if needed)
router.delete('/:id', deleteEmployee);

// @route   PUT api/employees/:id
// @desc    Update an employee by ID
// @access  Public (Change to Private if needed)
router.put('/:id', updateEmployee);

module.exports = router;
