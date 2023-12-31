interface SectionContent {
  title: React.ReactNode;
  body: React.ReactNode;
  extraHeaderContent?: React.ReactNode;
}

export const Section: React.FC<SectionContent> = ({
  title,
  extraHeaderContent,
  body,
}) => {
  return (
    <div className='overflow-hidden rounded-[5px] mb-[10px] my-auto leading-normal'>
      <header
        className='mb-[2px] p-[20px] grid border-solid 
      border-alto justify-between items-center 
      grid-cols-1'
      >
        <h2 className='md:m-0 md:text-[25px] text-[20px] bg-white dark:bg-davysGray'>
          {title}
        </h2>
        {extraHeaderContent}
      </header>
      {body}
    </div>
  );
};
