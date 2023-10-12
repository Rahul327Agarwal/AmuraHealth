import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUISelect from '../../../../LibraryComponents/MUISelect/MUISelect';
import PageHeader from '../../../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from '../../../../LibraryComponents/PannelFooter/PannelFooter';
import { AddCircleIcon, CloseIconDark, DragIconNew } from '../../PostCollections.svgs';
import { AddAnother, CRITERIA_OPTIONS, enableFooter, helperFunction } from './SortCollection.function';
import { useStyles } from './SortCollection.styles';
import { ICriteria, IProps } from './SortCollection.types';

const SortCollection = (props: IProps) => {
  const { onBack, onApply, editCriteria } = props;

  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  const [criteria, setCriteriaData] = useState<ICriteria[]>([]);
  const [dragDisabled, setDragDisabled] = useState(false);

  const isFooterEnable = useMemo(() => {
    if (!criteria.length) return false;
    return enableFooter(criteria);
  }, [criteria]);

  const isAddEnable = criteria.length < CRITERIA_OPTIONS.length && (!criteria.length || isFooterEnable);

  useEffect(() => {
    if (editCriteria) setCriteriaData(editCriteria);
  }, [editCriteria]);

  const handleChange = (index: number, fieldName: string, value: string) => {
    helperFunction(index, fieldName, value, criteria, setCriteriaData);
  };

  const deleteCard = (index) => {
    const curCriteria = criteria[index]?.criteria;

    if (curCriteria) {
      const deletedOptions = CRITERIA_OPTIONS.find((v) => v.value === curCriteria);
      setCriteriaData((pre) => [
        ...pre.filter((_, idx) => idx !== index).map((c) => ({ ...c, option: [...c.option, deletedOptions] })),
      ]);
    } else {
      setCriteriaData((pre) => [...pre.filter((_, idx) => idx !== index)]);
    }
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
  };

  const onCancel = () => {
    onBack();
  };

  const onApplySort = () => {
    onApply(criteria);
    onBack();
  };

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        handleBack={onBack}
        isClearAll={!!criteria?.length}
        clearAllText={'Clear'}
        headerContent="Sort by"
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
                            <div className={classes.dropdowndiv} />
                            <div className={classes.endIcons}>
                              {index !== 0 && (
                                <div className={classes.closeIcons} onClick={() => deleteCard(index)}>
                                  <CloseIconDark />
                                </div>
                              )}
                              <DragIconNew />
                            </div>
                          </div>
                          <MUISelect
                            placeholder={'Select'}
                            label={'Select'}
                            options={criteria[index]?.option}
                            value={criteria[index]?.criteria}
                            onChange={(e: any) => handleChange(index, 'criteria', e.target.value)}
                            labelId={'CRITERIA'}
                          />

                          {criteria[index]?.criteria && (
                            <MUISelect
                              placeholder={criteria[index]?.placeholder}
                              label={criteria[index]?.placeholder}
                              options={criteria[index]?.matchCriteriaOptions}
                              value={criteria[index]?.matchCriteria}
                              onChange={(e: any) => handleChange(index, 'matchCriteria', e.target.value)}
                              labelId={'MATCHING_CRITERIA'}
                            />
                          )}
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
          <div className={`${classes.addText} ${commonClass.caption12Medium}`} onClick={() => AddAnother(setCriteriaData)}>
            <AddCircleIcon /> Add criteria
          </div>
        )}
      </main>
      {isFooterEnable && (
        <PannelFooter
          customStyle={classes.footerStyle}
          handleAdd={onApplySort}
          handleCancel={onCancel}
          buttonOneTitle="Cancel"
          buttonTwoTitle="Apply"
        />
      )}
    </div>
  );
};

export default SortCollection;
