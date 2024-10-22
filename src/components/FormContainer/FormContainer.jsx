import FormFields from '../FormField/FormFields';

const FormContainer = ({ title, children }) => {
  // function renderFields(journey, data) {
  //   switch (journey) {
  //     case 'fees':
  //       return data.map((singleFee) => <FormFields data={data} />);
  //   }
  // }
  return (
    <div className='mb-6'>
      <div className='header-wrapper mb-3 bg-[#F3F4F6] p-2 rounded-lg'>
        <h3 className='text-sm font-semibold ml-2'>{title}</h3>
      </div>
      <div>
        <div className='myclass'>{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
