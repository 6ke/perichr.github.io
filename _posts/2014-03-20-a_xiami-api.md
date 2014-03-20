---
layout: post
title: 虾米音乐API
tags: [api,xiami,虾米音乐,php]
categories: api
---
[虾米音乐][1]是流行的也是我喜欢的一个乐库服务，基本上我要找的音乐都有。

对于外站调用，虾米提供了一个flash播放器，够用但可定制性不强。如果要可定制性，那么，获取音乐文件相关信息，包括名称、作者、专辑、实际地址等信息就是必须的了。虽然没有公开的方法，其实网上一直有流传一个“内部API”，只不过我以前一直不知道而已。嘛，现在知道了！那么写一个吧，既然涉及到远程xml读取，就用PHP君吧，转换成能用的jsonp形式。

```
<?php
function XiaMi2Json( $id, $callback = null ) {
	$json = '{"error":"Not a valid song id!"}';
	$xml = file_get_contents( "http://www.xiami.com/song/playlist/id/$id" );
	if( strlen( $xml != 0 ) ){
		if( !strpos( $xml, '<song_id>') ){
			$info = array( );
			
			preg_match_all( "/<song_id>(.*?)<\/song_id>/s",$xml, $song_id);	
			$info['song_id'] = $song_id[1][0];
			
			preg_match_all( "/<title>(.*?)<\/title>/s",$xml, $title);	
			$info['song_name'] = $title[1][0];
			
			preg_match_all( "/<album_id>(.*?)<\/album_id>/s",$xml, $album_id);	
			$info['album_id'] = $album_id[1][0];
			
			preg_match_all( "/<album_name>(.*?)<\/album_name>/s",$xml, $album_name);	
			$info['album_name'] = $album_name[1][0];
			
			preg_match_all( "/<artist_id>(.*?)<\/artist_id>/s",$xml, $artist_id);	
			$info['artist_id'] = $artist_id[1][0];
			
			preg_match_all( "/<artist>(.*?)<\/artist>/s",$xml, $artist_name);	
			$info['artist_name'] = $artist_name[1][0];
			
			preg_match_all( "/<lyric>(.*?)<\/lyric>/s",$xml, $lyric);	
			$info['lyric'] = $lyric[1][0];
			
			preg_match_all( "/<location>(.*?)<\/location>/s",$xml, $location);
			$location = $location[1][0];
			
			$num = substr( $location, 0, 1 );
			$inp = substr( $location, 1 );
			$iLe = strlen( $inp ) % $num;
			$quo = ( strlen( $inp ) - $iLe ) / $num;
			
			$a = 0;
			$ret = '';
			$arr = array();
			for ( $i = 0; $i < $num; $i ++ ) {
				$arr[$i] = ( $iLe > $i ? 1 : 0 ) + $quo;
			}
			for ( $i = 0; $i < $arr[1] ; $i ++) {
			    $a = 0;
			    for ( $j = 0; $j < $num; $j ++) {
			        $ret .= substr( $inp, $a + $i, 1 );
			        $a += $arr[$j];
			    }
			}
			
			$location = rawurldecode( $ret );
			$location = str_replace( '^', '0', $location );
			$location = str_replace( '+', ' ', $location );
			$location = preg_replace( '/-1395273600-0-(.*)/', '-1395273600-0-null', $location );
			$info['location'] = $location;
			$json = json_encode( $info );
		}
		
	}
	return is_null( $callback ) ? $json : "$callback($json)";
}

```


[1]:http://xiami.com