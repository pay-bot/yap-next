import { Table } from "reactstrap";
import { useRouter } from "next/router";
import ChartCard from "./ChartCard";
import { useGetRecentTransactionsQuery } from "../../Hooks/react-query/dashboard-hooks";

function RecentTransactions() {
  const { data, isLoading } = useGetRecentTransactionsQuery();
  const router = useRouter();
  // // console.log(data);
  if (isLoading) {
    return <h2>Table is loading</h2>;
  }

  return (
    <ChartCard title="Recent expenditures">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount in Rs</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.expenditures.map((expense) => (
            <tr key={expense.expenditure_title}>
              <th scope="row">{expense.expenditure_title}</th>
              <td>{expense.expenditure_amount}</td>
              <td>{expense.expenditure_date}</td>
              <td>{expense.belongs_to_category.category_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button variant="contained" onClick={() => navigate("/add-expense-img")}>
        Add Expense
      </button>
    </ChartCard>
  );
}

export default RecentTransactions;

