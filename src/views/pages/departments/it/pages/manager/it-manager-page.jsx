import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TableManager from './components/table-manager';
export default function ItManagerPage() {

  const dispatch = useDispatch();
  const { leadermanager } = useSelector((state) => state.managermonaco)
  const { ilyasmanager } = useSelector((state) => state.managerilyas)
  const { turanmanager } = useSelector((state) => state.managerturan)

  useEffect(() => {
    dispatch(fetch())
  }, [dispatch])

  return (
    <div className="flex flex-col gap-5">
      <TableManager data={leadermanager} title={"Лидер"} />
      <TableManager data={libertymanager} title={"Либерти"} />
      <TableManager data={monacomanager} title={"Монако"} />
      <TableManager data={turanmanager} title={"Туран"} />
      <TableManager data={fenixmanager} title={"Ильяс"} />
    </div>
  );
}