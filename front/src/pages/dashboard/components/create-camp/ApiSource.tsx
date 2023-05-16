import { FormEvent, ReactNode, useState } from "react";
import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Card,
  Typography,
  Box
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import { theme } from "../../../../theme";
import getVideoId from "get-video-id";
import { SourceType } from "../../../../models/interfaces/campaign";

const Input = (props: { label: string; icon: ReactNode, onSearch: (value: string) => void }) => {
  const [value, setValue] = useState('')
  const getInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement  
    setValue(target.value)
  }
  return (
    <FormControl
      sx={{
        mb: 1,
        width: "100%",
        "& label.Mui-focused": {
          color: "white",
        },
        "& .Mui-focused:after": {
          borderBottom: "2px solid white",
        },
      }}
      variant="filled"
    >
      <InputLabel sx={{ color: "white" }}>
        {props.label}
      </InputLabel>
      <FilledInput
        type="url"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Get Link" edge="end" onClick={() => props.onSearch(value)}>
              {props.icon}
            </IconButton>
          </InputAdornment>
        }
        sx={{
          background: theme.palette.secondary.light,
          "& .MuiFilledInput-input": {
            color: "white",
          },
          "& .MuiInputBase-root-MuiFilledInput-root:before": {
            borderBottom: "1px solid white;",
          },
        }}
        disableUnderline={true}
        onInput={getInput}
      />
    </FormControl>
  );
};

type ResultType = {
  id: {
    videoId: string
  },
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
}

type ResultCompressed = {
  id: string,
  title: string,
  desc: string,
  img: string
}
const queryApi = async(query: string) => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API
    const link = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${apiKey}`
    return fetch(link).then(resp => resp.json()).then(data => {
      const resp = data.items as ResultType[]
      const results: ResultCompressed[] = resp.map((res) => {
        return {
          id: res.id.videoId,
          title: res.snippet.title,
          desc: res.snippet.description,
          img: res.snippet.thumbnails.medium.url
        }
      })

      return results
    })
}

const ResultBox = (props: {result: ResultCompressed, onSelect: (id: string) => void}) => {
  const res = props.result
    return (
        <Card className="result-box" onClick={() => props.onSelect(res.id)}>
            <div className="img" style={{
                backgroundImage: 'url('+res.img+')'
            }} />
            <div className="meta">
                <Typography variant="h3" className="m-title ellipsis">{res.title}</Typography>
                <Typography className="m-desc ellipsis">{res.desc}</Typography>
            </div>
        </Card>
    )
}

const EmptyBox = (props: {message: string}) => {
  return (
    <>
      <Box sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        width: '100%',
        height: '220px',
        color: 'white'
      }}>
        <Typography>{props.message}</Typography>
      </Box>
    </>
  )
}

export default function ApiSource(props: {sourceType?: SourceType, onUpdateSrc: (src: string) => void }) {
    const [apiResults, loadResults] = useState<ResultCompressed[]>([])
    const [videoId, setVideoId] = useState<string | null>(null)


    const search = (value:string, searchType: 'url' | 'api' = 'api') => {
      if(searchType === 'api'){
        if(value && value !== ''){
          queryApi(value).then(results => loadResults(results))
        }

      } else {
        const { id } = getVideoId(value)
        updateSrc(id as string)
      }
    }

    const updateSrc = (src: string) => {
      setVideoId(src)
      props.onUpdateSrc(src)
    }

    const Preview = () => {
      const className = "yt-frame "+props.sourceType
      let previewFrame = <iframe
        className={ className }
        title="yt-src"
        src={"https://www.youtube.com/embed/"+videoId}
      />
      if(props.sourceType === 'Vimeo') previewFrame = <iframe
        className={ className }
        title="vimeo-src"
        src={`https://player.vimeo.com/video/${videoId}`} 
        frameBorder="0" 
        allow="autoplay"
      />
      if(videoId) {
        return previewFrame
      } else {
        return <EmptyBox message="Nothing to preview. Insert YouTube link above or try searching for a video." />
      }
    }

    return (
        <div className={`api-selector ${props.sourceType}`}>
          <div className="api-preview apc">
              <Input
                label={`Enter ${props.sourceType} URL and click next icon`}
                icon={<ArrowForwardIcon sx={{ color: "white" }} />}
                onSearch={(link) => search(link, 'url')}
              />
              <Preview />
          </div>
          {
            props.sourceType === 'YouTube' &&
            <div className="api-search apc">
                <Input
                  label={`Enter keyword and click search icon`}
                  icon={<SearchIcon sx={{ color: "white" }} />}
                  onSearch={search}
                />
                <div className="result-area">
                  {
                    apiResults.length ?
                    apiResults.map((res, index) => (<ResultBox key={index} result={res} onSelect={updateSrc} />))
                    : <EmptyBox message="No video results. Use the search box above to get started." />
                  }
                </div>
            </div>
          }
        </div>
    );
}
