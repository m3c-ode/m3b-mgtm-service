import React from 'react';
import Dashboard from '../../components/Dashboard';
import ProductsTable from '../../components/Tables/ProductsTable';
import RecipesTable from '../../components/Tables/RecipesTable';
import TableHeader from '../../components/Tables/TableHeader';

type Props = {};

const Products = (props: Props) => {
  const TableTitle = () =>
    <TableHeader
      title={'Products'}
    />;
  return (
    <Dashboard>
      <ProductsTable
        title={TableTitle}
        isLoading={false}
      />
    </Dashboard>
  );
};

export default Products;