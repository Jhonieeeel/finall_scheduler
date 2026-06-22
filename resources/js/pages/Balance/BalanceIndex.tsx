import balance from '@/routes/balance';
import { User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { UserColumns } from './columns/UserColumns';
import { BalanceIndexTable } from './table/BalanceIndexTable';
import FilterButton from './components/FilterButton';

type PageProps = {
    users: User[];
};

export default function BalanceIndex() {
    const { users } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Balance" />
            <div className="flex h-full flex-1 flex-col gap-4 space-y-2 overflow-x-auto rounded-xl md:p-14">
                <div>
                    <h1 className="text-4xl font-bold">Balance Overview</h1>
                    <p className="">
                        Monitor team leave entitlements, track utilization
                        trends, and manage pending requests across all
                        departments.
                    </p>
                </div>
                <div></div>
                <div className="min-h-100vh relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <BalanceIndexTable columns={UserColumns} data={users} />
                </div>
            </div>
        </>
    );
}

BalanceIndex.layout = {
    breadcrumbs: [
        {
            title: 'Balance',
            href: balance.index(),
        },
    ],
};
