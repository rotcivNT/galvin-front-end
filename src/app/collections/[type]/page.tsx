import ListProductWrapper from '~/components/ListProduct';

function Page({ params }: { params: { type: string } }) {
  return (
    <div>
      <ListProductWrapper type={+params.type} />
    </div>
  );
}

export default Page;
