import { Stat } from '@/app/stat'
import { Avatar } from '@/components/avatar'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'

export default async function Home() {
  let orders = await getRecentOrders()

  return (
    <>
      <Heading>Good afternoon, Erica</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Visitation Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
            <option value="last_quarter">Last year</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total visits" value="224" change="+4.5%" />
        <Stat title="Average return per visit" value="$24.00" change="+0.5%" />
        <Stat title="Off-peak visits" value="120" change="+3.5%" />
        <Stat title="Peak hour visits" value="20" change="-30.02%" />
      </div>
      <Subheading className="mt-14">Recent visits</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Member ID</TableHeader>
            <TableHeader>Visitation date</TableHeader>
            <TableHeader>Member name</TableHeader>
            <TableHeader>Check-in status</TableHeader>
            <TableHeader className="text-right">Amount received</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">AU{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
