import React from 'react';
import Dashboard from '../../components/Dashboard';
import RecipesTable from '../../components/Tables/RecipesTable';
import TableHeader from '../../components/Tables/TableHeader';

type Props = {};

const Recipes = (props: Props) => {
  const TableTitle = () =>
    <TableHeader
      title={'Recipes'}
    />;
  return (
    <Dashboard>
      <RecipesTable
        title={TableTitle}
        isLoading={false}
      />
    </Dashboard>
  );
};

export default Recipes;