import React, { useRef, useState, Fragment } from "react";

const ExpenseForm = () => {
  const moneySpentRef = useRef(null);
  const expenseDescriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const moneySpent = moneySpentRef.current.value;
    const expenseDescription = expenseDescriptionRef.current.value;
    const category = categoryRef.current.value;

    const ExpenseDetails = {
      money: moneySpent,
      description: expenseDescription,
      category: category,
    };
    setData([...data, ExpenseDetails]);
  };

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          <span className="text-green-600">Expense </span>
          <span className="text-red-600">Tracker</span>
        </h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="moneySpent"
            >
              Money Spent
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="moneySpent"
              type="number"
              placeholder="Enter amount"
              required
              ref={moneySpentRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expenseDescription"
            >
              Expense Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expenseDescription"
              type="text"
              placeholder="Enter description"
              required
              ref={expenseDescriptionRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              required
              ref={categoryRef}
            >
              <option value="" disabled selected>
                Select a category
              </option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Entertainment">Entertainment</option>
              {/* Add more categories here */}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
      {/* Display Output */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          <span className="text-green-500">Expense </span>
          <span className="text-red-500">History</span>
        </h2>
        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Money Spent
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={Math.random().toString()}>
                  <td className="px-6 py-4 whitespace-no-wrap">{item.money}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {item.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ExpenseForm;
