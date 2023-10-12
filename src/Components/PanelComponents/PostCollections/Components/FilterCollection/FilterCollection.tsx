import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUIAutoSelect from '../../../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import MUISelect from '../../../../LibraryComponents/MUISelect/MUISelect';
import PageHeader from '../../../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../../../LibraryComponents/PannelFooter/PannelFooter';
import { AddCircleIcon, CloseIconDark, DragIconNew } from '../../PostCollections.svgs';
import { AddAnother, CLAUSE_OPTIONS, enableFooter, helperFunction } from './FilterCollection.function';
import { useStyles } from './FilterCollection.styles';
import { ICriteria, IProps } from './FilterCollection.types';

const FilterCollection = (props: IProps) => {
  const { onBack, editCriteria, onApply, criteriaBaseOpts, criteriaOpts } = props;

  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  const [criteria, setCriteriaData] = useState<ICriteria[]>([]);
  const [dragDisabled, setDragDisabled] = useState(false);
  const [domainType, setDomainType] = useState('');

  useEffect(() => {
    if (editCriteria?.criteria) {
      setCriteriaData(editCriteria?.criteria);
      setDomainType(editCriteria?.domainType);
    }
  }, [editCriteria]);

  const isFooterEnable = useMemo(() => {
    if (!criteria.length) return false;
    return enableFooter(domainType, criteria);
  }, [domainType, criteria]);

  const isAddEnable = !criteria.length || isFooterEnable;

  const handleChange = (index: number, fieldName: string, value: string) => {
    helperFunction(index, fieldName, value, criteriaBaseOpts, criteria, setCriteriaData);
  };

  const deleteCard = (index) => {
    setCriteriaData([
      ...criteria
        .filter((_, idx) => idx !== index)
        .map((criteria, index) => ({ ...criteria, clause: index === 0 ? '' : criteria.clause })),
    ]);
  };

  const onDragEnd = (result) => {
    let tempCriteria = [];
    criteria.forEach((data) => {
      tempCriteria.push(data);
    });
    setCriteriaData((prev) => {
      const tempCriteria = JSON.parse(JSON.stringify(prev));
      if (!result.destination) return prev;
      if (result.destination.index === result.source.index) return prev;
      const sourceData = tempCriteria[result.source.index];
      let sourceClause = sourceData.clause;
      const destinationData = tempCriteria[result.destination.index];
      let destinationClause = destinationData.clause;

      tempCriteria.splice(result.destination.index, 1, { ...sourceData, clause: destinationClause });
      tempCriteria.splice(result.source.index, 1, { ...destinationData, clause: sourceClause });

      return tempCriteria;
    });
  };

  const onClear = () => {
    setCriteriaData([]);
    setDomainType('');
  };

  const onCancel = () => {
    onBack();
  };

  const onApplyFilter = () => {
    onApply({ criteria, domainType });
    onBack();
  };

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        handleBack={onBack}
        isClearAll={!!criteria?.length}
        clearAllText={'Clear Filter'}
        headerContent="Filter"
        handleClearAll={onClear}
        customStyle={classes.headerStyle}
      />
      <main className={classes.scrollBody}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabs-droppable" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {criteria?.map((data, index) => (
                  <Draggable draggableId={data.id} key={data.id} index={index} isDragDisabled={dragDisabled}>
                    {(provided) => (
                      <div
                        className={'draggableStyle'}
                        key={data.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={classes.criteriaWrapper}>
                          <div className={classes.spaceBetween}>
                            <div className={classes.dropdowndiv}>
                              {index === 0 ? (
                                <span className={`${classes.subTitle} ${commonClass.body15Regular}`}>Where</span>
                              ) : (
                                <MUISelect
                                  options={CLAUSE_OPTIONS}
                                  value={criteria[index]?.clause || 'and'}
                                  onChange={(e: any) => {
                                    handleChange(index, 'clause', e.target.value);
                                  }}
                                  labelId={'Choose a tag'}
                                />
                              )}
                            </div>
                            <div className={classes.endIcons}>
                              {index !== 0 && (
                                <div className={classes.closeIcons} onClick={() => deleteCard(index)}>
                                  <CloseIconDark />
                                </div>
                              )}
                              <DragIconNew />
                            </div>
                          </div>
                          {index === 0 ? (
                            <MUISelect
                              placeholder={'Select'}
                              label={'Select'}
                              options={criteriaBaseOpts['domain']?.option || []}
                              value={domainType}
                              onChange={(e: any) => setDomainType(e.target.value)}
                              labelId={'CRITERIA'}
                            />
                          ) : null}
                          {(!index && domainType) || index ? (
                            <MUISelect
                              placeholder={'Select'}
                              label={'Select'}
                              options={criteriaOpts}
                              value={criteria[index]?.criteria}
                              onChange={(e: any) => handleChange(index, 'criteria', e.target.value)}
                              labelId={'CRITERIA'}
                            />
                          ) : null}

                          {criteria[index]?.criteria ? (
                            criteria[index]?.type === 'AUTOCOMPLETE' ? (
                              <MUIAutoSelect
                                options={criteria[index]?.matchCriteriaOptions}
                                InputProps={{ label: criteria[index]?.placeholder, placeholder: '' }}
                                onChange={(_, value) => handleChange(index, 'value', value)}
                                value={criteria[index]?.value}
                                fullWidth
                              />
                            ) : (
                              <MUISelect
                                placeholder={criteria[index]?.placeholder}
                                label={criteria[index]?.placeholder}
                                options={criteria[index]?.matchCriteriaOptions}
                                value={criteria[index]?.matchCriteria}
                                onChange={(e: any) => handleChange(index, 'matchCriteria', e.target.value)}
                                labelId={'MATCHING_CRITERIA'}
                              />
                            )
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isAddEnable && (
          <div
            className={`${classes.addText} ${commonClass.caption12Medium}`}
            onClick={() => AddAnother(criteria, setCriteriaData)}
          >
            <AddCircleIcon /> Add criteria
          </div>
        )}
      </main>
      {isFooterEnable && (
        <PannelFooter
          customStyle={classes.footerStyle}
          handleAdd={onApplyFilter}
          handleCancel={onCancel}
          buttonOneTitle="Cancel"
          buttonTwoTitle="Apply Filter"
        />
      )}
    </div>
  );
};

export default FilterCollection;
