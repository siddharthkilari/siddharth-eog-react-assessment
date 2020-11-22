import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/ActiveMetrics/sliceReducer';

export default function Switches() {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
    checkedF: false,
  });
  const fieldConfig = [
    {
      prop: 'checkedA',
      value: 'injValveOpen',
      label: 'INJ Valve Open',
    },
    {
      prop: 'checkedB',
      value: 'oilTemp',
      label: 'Oil Temp',
    },
    {
      prop: 'checkedC',
      value: 'tubingPressure',
      label: 'Tubing Pressure',
    },
    {
      prop: 'checkedD',
      value: 'flareTemp',
      label: 'Flare Temp',
    },
    {
      prop: 'checkedE',
      value: 'casingPressure',
      label: 'Casing Pressure',
    },
    {
      prop: 'checkedF',
      value: 'waterTemp',
      label: 'Water Temp',
    },
  ];
  const timeStamp = useSelector(state => state.heartbeat);
  const dispatch = useDispatch();
  const activeArr = useSelector(state => state.activeMetrics.selectedMetrics);

  const handleChange = name => event => {
    const metric = event.target.value;
    const isChecked = event.target.checked;
    setState({ ...state, [name]: event.target.checked });

    if (isChecked) {
      dispatch(
        actions.active({
          metricName: metric,
          before: timeStamp.current,
          after: timeStamp.past,
        }),
      );
    } else {
      const metricIndex = activeArr.find(element => element.metricName === metric);
      dispatch(actions.remove(metricIndex.metricName));
    }
  };

  return (
    <div>
      <h1>Select Metrics</h1>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          {fieldConfig.map(x => {
            return (
              <FormControlLabel
                value="top"
                control={
                  <Switch
                    key={x.prop}
                    checked={state[x.prop]}
                    onChange={handleChange(x.prop)}
                    value={x.value}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                label={x.label}
                labelPlacement="top"
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </div>
  );
}
