import React, { useState, useEffect } from 'react';
import {
    List, Edit, Show, Create, Datagrid, SimpleForm, TopToolbar, DatagridBody, SimpleShowLayout, ShowView, ShowController,
    CreateButton, EditButton, ExportButton, DeleteButton, ShowButton, Button,
    ReferenceInput, SelectInput,
    TextField, DateField, ReferenceField, SelectField, BooleanField, ReferenceManyField, ArrayField, SingleFieldList, ChipField,
    RecordContextProvider,
    TabbedForm, FormTab, useGetList, TabbedFormTabs, useGetOne, NumberField, linkToRecord
} from 'react-admin'
import { Box, Card, CardContent, Chip , Typography} from '@material-ui/core';
import ActionButton from '../../components/ActionButton';
import CustomChip from '../../components/CustomChip';
import UserChip from '../../components/UserChip';
import orderStatus from '../../constants/orderStatus';
import ConfimOrder from '../../components/ConfirmOrder';


const Title = (props) => {
    const [ title, setTitle ] = useState("...")
    const { data } = useGetOne(props.resource, props.id)
    console.log(data)
    
    return <h3>{data ? 'Commande de ' +data.name : title}</h3>
}

export default (props) => {
    const [ state, setState ] = useState([])
    
  
    return (
        <ShowController  {...props} title={<Title {...props} />} >
            {
                controllerProps => (
                    <ShowView {...props} {...controllerProps} >
                    <RecordContextProvider value={controllerProps.record}>

                        {console.log(controllerProps.record)}
                        <SimpleShowLayout>
                            <CustomChip 
                                wrapperOnly 
                                getText={(rec => (
                                    <>
                                        { rec.status === orderStatus.PENDING && <Typography variant="body1" color='error' >En attente</Typography> }                
                                    </>
                                ) )} 
                                linkStyle={{
                                    position: 'relative',
                                    left: 50
                                }} 
                            />
                            <ReferenceField source="article_id" reference="articles" label="Article" >
                                <TextField source="name" />
                            </ReferenceField>
                            <NumberField
                                label="Prix unitaire"
                                source="unit_price"
                                color="inherit"
                                options={{
                                    style: 'currency',
                                    currency: 'XOF',
                                }}
                                
                            />
                            <TextField source="order_quantity"  label="Quantit??" />
                            <ReferenceField source="orderer_id" reference="users" label="Client" >
                                <Typography color='secondary' variant='caption' >
                                    <UserChip getText={rec => `Command?? par: ${rec.full_name}, ${rec.email}`} />
                                </Typography>
                            </ReferenceField>
                            <Box width="100vw">
                                <ConfimOrder label="Confirmer la commande"/>
                                <ConfimOrder label="Rejeter la commande" />
                            </Box>
                        </SimpleShowLayout>

                    </RecordContextProvider>
                    </ShowView>
                )
            }
        </ShowController>
    )
}
