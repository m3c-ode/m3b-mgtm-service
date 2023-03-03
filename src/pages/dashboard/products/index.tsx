import React from 'react';
import Dashboard from '../../../components/Dashboard';
import ProductsTable from '../../../components/Tables/ProductsTable';
import RecipesTable from '../../../components/Tables/RecipesTable';
import TableHeader from '../../../components/Tables/TableHeader';
import { IoAddOutline } from 'react-icons/io5';


type Props = {};

const Products = (props: Props) => {
  const TableTitle = () =>
    <TableHeader
      title={'Products'}
      buttonText="Add Product"
      buttonIcon={<IoAddOutline
        style={{
          fontSize: '19px',
          position: 'relative',
          top: '4px'
        }}
      />}
    // buttonPath={'/dashboard/clients/new'}

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