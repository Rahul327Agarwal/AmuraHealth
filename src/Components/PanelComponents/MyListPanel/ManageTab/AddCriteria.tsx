import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import MUISelect from '../../../LibraryComponents/MUISelect/MUISelect';
import {   AddCircleIcon, CloseIconDark } from '../../../SVGs/Common';
import { useStyles } from './ManageTab.styles';
import { CLAUSE_OPTIONS, IAddCriteria } from './ManageTab.types';
import { AddAnother, helperFunction } from './ManagerTab.functions';
import { RenderCriteriaInput } from './RenderCriteriaInput';
import { DragIcon } from './ModifyTab.svg';

const AddCriteria = (props: IAddCriteria) => {
  const { criteria, setCriteriaData, enable, criteriaOptions } = props;
  const commonClass = useCommonStyles();
  const { classes } = useStyles(props);
  const [dragDisabled, setDragDisabled] = useState(false);

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
  const handleChange = (arrayIndex, fieldName, value) => {
    helperFunction(arrayIndex, fieldName, value, criteria, setCriteriaData);
  };

  return (
    <>
      <span className={`${classes.groupName} ${commonClass.body17Medium}`}>Criteria</span>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tabs-droppable" direction="vertical">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {criteria?.map((data, index) => (
                <Draggable draggableId={data.id} key={data.id} index={index}>
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
                            <div className={classes.closeIcons} onClick={() => deleteCard(index)}>
                              {<CloseIconDark />}
                            </div>
                            <div>{<DragIcon />}</div>
                          </div>
                        </div>
                        <MUISelect
                          placeholder={'Select criteria'}
                          label={'Select criteria'}
                          options={criteriaOptions}
                          value={criteria[index]?.criteria}
                          onChange={(e: any) => {
                            handleChange(index, 'criteria', e.target.value);
                          }}
                          labelId={'CRITERIA'}
                        />

                        {criteria[index]?.criteria && (
                          <MUISelect
                            placeholder={'Select match criteria'}
                            label={'Select match criteria'}
                            options={criteria[index]?.matchCriteriaOptions}
                            value={criteria[index]?.matchCriteria}
                            onChange={(e: any) => {
                              handleChange(index, 'matchCriteria', e.target.value);
                            }}
                            labelId={'MATCHING_CRITERIA'}
                          />
                        )}

                        {criteria[index]?.matchCriteria && (
                          <RenderCriteriaInput
                            matchCriteria={criteria[index]?.type}
                            cardData={criteria}
                            index={index}
                            options={criteria[index]?.option}
                            handleChange={(arrayIndex, fieldName, value) => {
                              handleChange(arrayIndex, fieldName, value);
                            }}
                            dragDisabled={dragDisabled}
                            setDragDisabled={setDragDisabled}
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
      {enable && (
        <div
          className={`${classes.addText} ${commonClass.caption12Medium}`}
          onClick={() => {
            AddAnother(criteria, setCriteriaData);
          }}
        >
          {<AddCircleIcon />} Add another criteria
        </div>
      )}
    </>
  );
};

export default AddCriteria;
