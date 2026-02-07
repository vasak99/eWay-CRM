import { useState } from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import UserForm from './components/user-form/UserForm';
import PageLayout from './components/page-layout/PageLayout';
import UserList from './components/user-list/UserList';
import UserLoaderDialog from './components/user-loader-dialog/UserLoaderDialog';


// This is a React Hook component.
const App = () => {

    return (
        <div>
            <PageLayout>
                <Pivot>
                    <PivotItem headerText="Search users">
                        <UserForm />
                    </PivotItem>
                    <PivotItem headerText="Previous searches">
                        <UserList />
                    </PivotItem>
                </Pivot>
            </PageLayout>
        </div>
    );
};

export default App;
