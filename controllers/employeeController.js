const Employee = require("../models/Employee");
const Counter = require("../models/Counter");

// Function to get the next sequence value for the given counter
const getNextSequenceValue = async (sequenceName) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true } // Create the document if it doesn't exist
  );
  return counter.sequenceValue;
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  const { name, email, phone, isActive } = req.body;

  // Validate input
  if (!name || !email || !phone || isActive === undefined) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const id = await getNextSequenceValue("employeeId");
    const newEmployee = new Employee({
      id,
      name,
      email,
      phone,
      isActive,
    });

    const employee = await newEmployee.save();
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOneAndDelete({ id });
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, isActive } = req.body;

    // Validate input
    if (!name || !email || !phone || isActive === undefined) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      { name, email, phone, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
