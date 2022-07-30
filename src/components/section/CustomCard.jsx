import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  root: { minWidth: 275 },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: { fontSize: 14 },
  pos: { marginBottom: 12 },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: { paddingTop: '0' },
});

function ScrumCard({ card, index }) {
  const classes = useStyles();

  return (
    <Draggable draggableId={card?.id} index={index}>
      {(provided) => {
        return (
          <Card className={classes.root} {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" component="h2">
                {card?.title}
              </Typography>
              <Typography variant="body2" component="p">
                {card?.content}
              </Typography>
            </CardContent>
          </Card>
        );
      }}
    </Draggable>
  );
}

export default ScrumCard;
